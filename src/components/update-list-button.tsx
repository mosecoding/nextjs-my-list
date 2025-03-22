"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { updateList } from "@/app/actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Edit2Icon, Loader2Icon } from "lucide-react";
import { toast } from "sonner";

interface UpdateListButtonProps {
  prevName: string;
  listId: string;
}

export default function UpdateListButton({
  prevName,
  listId,
}: UpdateListButtonProps) {
  const [name, setName] = useState(prevName);
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  async function handleUpdateList() {
    setIsPending(true);

    const response = await updateList(listId, name);

    setIsPending(false);

    if (response.success) {
      setOpen(false);
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="secondary">
          <Edit2Icon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Rename Your List</DialogTitle>
          <DialogDescription>
            Choose a new name for your list. You can always update it later.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={isPending || name.length === 0 || name.length > 40}
            onClick={handleUpdateList}
          >
            {isPending && <Loader2Icon className="animate-spin" />}
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
