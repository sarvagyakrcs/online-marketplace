import { Prisma } from "@prisma/client";

export type ExtendedReviewType = Prisma.ReviewGetPayload<{
  include: {
    user: {
      select: {
        id: true;
        name: true;
        profilePic: true;
      };
    };
  };
}>;