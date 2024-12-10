import { user, location } from "server/models";

export type Msg =
  | ["profile/select", { userid: string }]
  | [
    "profile/save",
    {
      userid: string;
      profile: user;
      onSuccess?: () => void;
      onFailure?: (err: Error) => void;
    }
  ]
  | ["tour/index", { userid: string }]
  | ["tour/select", { tourid: string }]
  | [
    "tour/save-destination",
    {
      tourid: string;
      index: number;
      onSuccess?: () => void;
      onFailure?: (err: Error) => void;
    }
  ];