import NewVerficationForm from "@/modules/new-verification/form/new-verification-form";
import React, { Suspense } from "react";

const NewVerificationPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <NewVerficationForm />
      </Suspense>
    </div>
  );
};

export default NewVerificationPage;
