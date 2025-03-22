import CreateListButton from "@/components/create-list-button";
import Lists from "@/components/lists";
import React from "react";

export default function ListsPage() {
  return (
    <section className="space-y-14">
      <div className="space-y-7">
        <h1 className="max-w-lg mx-auto text-3xl font-semibold text-center lg:text-3xl">
          Create, manage, and explore your personal lists.
        </h1>
        <div className="w-full flex items-center justify-center">
          <CreateListButton />
        </div>
      </div>
      <Lists />
    </section>
  );
}
