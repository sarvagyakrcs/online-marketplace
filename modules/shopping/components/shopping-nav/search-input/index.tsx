"use client"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field } from "@/components/ui/fieldset";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import SearchForm from "./form";

export function SearchDialog() {
  const [isOpen, setIsOpen] = useState(false);

  //TODO: Add search functionality
  return (
    <div className="z-30">
      <Button
        outline
        className="border-none"
        type="button"
        onClick={() => setIsOpen(true)}
      >
        <SearchIcon size={17} />
        <span className="sr-only">Search</span>
      </Button>
      <Dialog className="z-40" open={isOpen} onClose={setIsOpen}>
        <DialogTitle>Search Products</DialogTitle>
        <DialogDescription className="text-sm text-muted-foreground">
          Enter the product name or category you want to search for.
        </DialogDescription>
        <DialogBody>
          <Field>
            <SearchForm setIsOpen={setIsOpen} />
          </Field>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
