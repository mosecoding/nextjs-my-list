"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { createList } from "@/app/actions";
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
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

export default function CreateListButton() {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  async function handleCreateList() {
    setIsPending(true);

    const response = await createList(name);

    setIsPending(false);

    if (response.success) {
      setOpen(false);
      setName("");
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="h-12 text-base hover:cursor-pointer">
          Create List
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a new list</DialogTitle>
          <DialogDescription>
            Give your list a name. You can edit or delete it later.
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
            onClick={handleCreateList}
          >
            {isPending && <Loader2Icon className="animate-spin" />}
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
