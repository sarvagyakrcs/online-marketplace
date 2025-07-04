"use client"
import React from "react";
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { useState } from 'react'
import { IconUser } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import FormSignUp from "../forms/register/form";

type Props = {
  type: "form" | "modal";
  modalLabel ?: "text" | "icon" | "both"
};

const SignUpForm = ({ type, modalLabel }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  if (type === "form") {
    return <FormSignUp />
  }
  if (type === "modal") {
    return (
      <>
        <Button color="dark/white" className={cn(modalLabel === "icon" && "p-2 rounded-full")} type="button" onClick={() => setIsOpen(true)}>
          {
            modalLabel === "text" ? "Sign Up" :
            modalLabel === "icon" ? (
              <IconUser size={20} />
            ) : (
              <div className="flex items-center gap-2">
                Sign Up
              </div>
            )
          }
        </Button>
        <Dialog className="mt-8" open={isOpen} onClose={setIsOpen}>
          <FormSignUp />
        </Dialog>
      </>
    );
  }
};

export default SignUpForm;
