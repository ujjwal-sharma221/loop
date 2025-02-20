"use client";

import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  CopyCheck,
  Ellipsis,
  Globe,
  ImagePlusIcon,
  LockIcon,
  RotateCcw,
  SparklesIcon,
  Trash2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
import { VideoPlayer } from "./video-player";
import { CopyIcon } from "@/components/icons/copy-icon";
import { CheckIcon } from "@/components/icons/check-icon";
import { snakeCaseToTitle } from "@/lib/utils";
import { THUMBNAIL_FALLBACK } from "@/lib/constants";
import { ThumbnailUploadModal } from "./thumbnail-upload-modal";

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

  const fullUrl = `${process.env.VERCEL_URL || "http://localhost:3000"}/videos/${videoId}`;
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    await navigator.clipboard.writeText(fullUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-6 flex w-full items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold"> Video Details</h1>
              <p className="text-muted-foreground">
                Manager your video options
              </p>
            </div>
            <div className="flex items-center gap-x-2">
              <Button type="submit" disabled={update.isPending}>
                Save
              </Button>
              <VideoDropdownMenu videoId={videoId} />
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
                      <Input
                        {...field}
                        placeholder="add a title to your video"
                      />
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
                name="thumbnailUrl"
                control={form.control}
                render={() => (
                  <FormItem>
                    <FormLabel>Thumbnail</FormLabel>
                    <FormControl>
                      <div className="group relative h-[84px] w-[153px] border border-dashed border-neutral-400 p-0.5">
                        <Image
                          fill
                          alt="thumbnail"
                          src={video.thumbnailUrl ?? THUMBNAIL_FALLBACK}
                          className="object-cover"
                        />

                        <ImageDropdownMenu videoId={videoId} />
                      </div>
                    </FormControl>
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
              <div className="flex h-fit flex-col gap-4 overflow-hidden rounded-xl">
                <div className="relative aspect-video overflow-hidden">
                  <VideoPlayer
                    playbackId={video.muxPlaybackId}
                    posterUrl={video.thumbnailUrl}
                  />
                </div>
                <div className="flex flex-col gap-y-6 bg-muted p-4">
                  <div className="flex items-center justify-between gap-x-2">
                    <div className="flex flex-col gap-y-1">
                      <p className="text-xs text-muted-foreground">
                        Video Link
                      </p>
                      <div className="flex items-center gap-x-2">
                        <Link href={`/videos/${video.id}`}>
                          <p className="line-clamp-1 text-sm font-semibold text-sky-700 underline">
                            {fullUrl}
                          </p>
                        </Link>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="shrin-0"
                          disabled={copied}
                          onClick={onCopy}
                        >
                          {copied ? <CheckIcon /> : <CopyIcon />}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-y-1">
                      <p className="text-xs text-muted-foreground">
                        Video Status
                      </p>
                      <p className="text-sm font-semibold">
                        {snakeCaseToTitle(video.muxStatus || "preparing")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-y-1">
                      <p className="text-xs text-muted-foreground">
                        Track Status
                      </p>
                      <p className="text-sm font-semibold">
                        {snakeCaseToTitle(
                          video.muxTrackStatus || "no subtitiles",
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <FormField
                control={form.control}
                name="visibility"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Visibility</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value ?? undefined}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="select a visibility" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="private">
                          <div className="flex items-center">
                            <LockIcon className="mr-2 size-4" />
                            Private
                          </div>
                        </SelectItem>
                        <SelectItem value="public">
                          <div className="flex items-center">
                            <Globe className="mr-2 size-4" />
                            Public
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}

function VideoDropdownMenu({ videoId }: { videoId: string }) {
  const router = useRouter();
  const utils = trpc.useUtils();
  const remove = trpc.videos.remove.useMutation({
    onSuccess: () => {
      utils.studio.getMany.invalidate();
      toast.success("Video removed");
      router.push("/studio");
    },
    onError: (err) => {
      toast.error("something went wrong");
      console.error(err);
    },
  });
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
        <DropdownMenuItem onClick={() => remove.mutate({ id: videoId })}>
          <Trash2 className="mr-2 size-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ImageDropdownMenu({ videoId }: { videoId: string }) {
  const [thumbnailModalOpen, setThumbnailModalOpen] = useState(false);
  const utils = trpc.useUtils();
  const restoreThumbnail = trpc.videos.restoreThumbnail.useMutation({
    onSuccess: () => {
      utils.studio.getMany.invalidate();
      utils.studio.getOne.invalidate({ id: videoId });
      toast.success("Thumbnail restored");
    },
    onError: (err) => {
      toast.error("something went wrong");
      console.error(err);
    },
  });

  return (
    <>
      <ThumbnailUploadModal
        videoId={videoId}
        open={thumbnailModalOpen}
        onOpenChange={setThumbnailModalOpen}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="absolute right-1 top-1 size-7 rounded-full bg-black/50 opacity-100 shadow-none duration-300 hover:bg-black/50 group-hover:opacity-100 md:opacity-0"
            aria-label="Open edit menu"
          >
            <Ellipsis size={16} className="text-white" aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" side="right">
          <DropdownMenuItem onClick={() => setThumbnailModalOpen(true)}>
            <ImagePlusIcon className="mr-1 size-4" />
            Change
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SparklesIcon className="mr-1 size-4" />
            AI-Generated
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => restoreThumbnail.mutate({ id: videoId })}
          >
            <RotateCcw className="mr-1 size-4" />
            Restore
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
