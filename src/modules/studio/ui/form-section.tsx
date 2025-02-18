"use client";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Ellipsis, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import { trpc } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { videoUpdateSchema } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormSectionProps {
  videoId: string;
}

export function FormSection({ videoId }: FormSectionProps) {
  return (
    <Suspense fallback={<FormSectionSkeleton />}>
      <ErrorBoundary fallback={<p>error</p>}>
        <FormSectionSuspense videoId={videoId} />
      </ErrorBoundary>
    </Suspense>
  );
}

function FormSectionSkeleton() {
  return <p>Loading</p>;
}

function FormSectionSuspense({ videoId }: FormSectionProps) {
  const utils = trpc.useUtils();

  const [video] = trpc.studio.getOne.useSuspenseQuery({ id: videoId });
  const [categories] = trpc.catgories.getMany.useSuspenseQuery();
  const update = trpc.videos.update.useMutation({
    onSuccess: () => {
      utils.studio.getMany.invalidate();
      utils.studio.getOne.invalidate({ id: videoId });
      toast.success("Video information updated");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const form = useForm<z.infer<typeof videoUpdateSchema>>({
    defaultValues: video,
    resolver: zodResolver(videoUpdateSchema),
  });

  const onSubmit = async (data: z.infer<typeof videoUpdateSchema>) => {
    console.log(data);
    await update.mutateAsync(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mb-6 flex w-full items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold"> Video Details</h1>
            <p className="text-muted-foreground">Manager your video options</p>
          </div>
          <div className="flex items-center gap-x-2">
            <Button type="submit" disabled={update.isPending}>
              Save
            </Button>
            <VideoDropdownMenu />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="space-y-8 lg:col-span-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="add a title to your video" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      value={field.value ?? ""}
                      rows={10}
                      className="resize-none pr-10"
                      placeholder="add a title to your video"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value ?? undefined}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-y-8 lg:col-span-2">
            <div className="flex h-fit flex-col gap-4 overflow-hidden rounded-xl"></div>
          </div>
        </div>
      </form>
    </Form>
  );
}

function VideoDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full shadow-none"
          aria-label="Open edit menu"
        >
          <Ellipsis size={16} strokeWidth={2} aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Trash2 className="mr-2 size-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
