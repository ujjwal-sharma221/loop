import { Variants, Transition } from "motion/react";

import { useIsMobile } from "@/hooks/use-mobile";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "./ui/drawer";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface ResponsiveDialogProps {
  children: React.ReactNode;
  open: boolean;
  title: string;
  onOpenChange: (open: boolean) => void;
}

export function ResponsiveModal({
  children,
  open,
  onOpenChange,
  title,
}: ResponsiveDialogProps) {
  const isMobile = useIsMobile();
  const customVariants: Variants = {
    initial: {
      scale: 0.9,
      filter: "blur(10px)",
      y: "100%",
    },
    animate: {
      scale: 1,
      filter: "blur(0px)",
      y: 0,
    },
  };

  const customTransition: Transition = {
    type: "spring",
    bounce: 0,
    duration: 0.4,
  };

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
          </DrawerHeader>
          {children}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog
      variants={customVariants}
      transition={customTransition}
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white p-6 dark:bg-zinc-900">
        <DialogHeader>
          <DialogTitle className="text-zinc-900 dark:text-white">
            {title}
          </DialogTitle>
        </DialogHeader>
        {children}
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
}
