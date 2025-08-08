import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Translator } from "@/lib/i18n/Translator";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { getFirstName, getGreeting } from "@/utils";
import { Button } from "@/components/ui/button";
import DraggableList from "@/components/ui/draggable-list";
import { Skeleton } from "@/components/ui/skeleton";
import { Typography } from "@/components/ui/typography";
import WavingHandIcon from "@/images/waving-hand.png";
import type { Tables } from "supabase";
import {
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar";

export function Dashboard() {
  const { user, isLoadingUser } = useAuth();
  const { t } = useTranslation();
  const [lists, setLists] = useState<Tables<"lists">[]>([]);

  useEffect(() => {
    // private.is_user_member_of_list(( SELECT auth.uid() AS uid), id)
    async function getUserLists() {
      const { data, error } = await supabase.from("lists").select(
        // `
        // name,
        // list_members (
        //   role,
        //   profiles (
        //     avatar_url
        //   )
        // )
        // `
        `
        name,
        list_members (
          role,
          profiles (
            avatar_url
          )
        )
        `
      );

      if (error) {
        toast.error(<Translator path="dashboard.lists.fail" />);
        return;
      }

      setLists(data);
    }

    if (user) getUserLists();
  }, [user]);

  return (
    <>
      {isLoadingUser ? (
        <div className="flex flex-col space-y-2">
          <Skeleton className="w-96 h-8 rounded-2xl" />
          <Skeleton className="w-40 h-8 rounded-2xl" />
        </div>
      ) : (
        <div className="flex gap-3">
          <Typography variant="h1">
            <span className="text-4xl block">
              <Translator path={getGreeting()} />,
            </span>
            {getFirstName(user?.user_metadata.full_name)}!
          </Typography>
          <img
            className="w-20 relative -top-8"
            src={WavingHandIcon}
            alt={t("imagesAut.wavingHand")}
          />
        </div>
      )}

      <section className="space-y-8">
        <div className="flex justify-between">
          <Typography variant="h2">
            <Translator path="dashboard.lists.title" />
          </Typography>

          <Button className="font-bold">
            + <Translator path="dashboard.lists.add" />
          </Button>
        </div>

        <div className="max-w-2xl mx-auto">
          <DraggableList
            items={lists}
            setItems={setLists}
            getId={(item) => item.id}
            renderItem={(item) => (
              <>
                <CardHeader>
                  <CardTitle>{item.name}</CardTitle>
                  <CardAction>
                    <Typography className="text-sm font-bold">
                      11 items
                    </Typography>
                  </CardAction>
                </CardHeader>

                <CardContent>
                  <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
                    <AvatarGroup max={3}>
                      <Avatar className="w-7 h-7">
                        <AvatarImage
                          src="https://github.com/shadcn.pnga"
                          alt="@shadcn"
                        />
                        <AvatarFallback>
                          <img src="https://github.com/shadcn.png" alt="cn" />
                        </AvatarFallback>
                      </Avatar>
                      <Avatar className="w-7 h-7">
                        <AvatarImage
                          src="https://github.com/leerob.pnga"
                          alt="@leerob"
                        />
                        <AvatarFallback>LR</AvatarFallback>
                      </Avatar>
                      <Avatar className="w-7 h-7">
                        <AvatarImage
                          src="https://github.com/evilrabbit.png"
                          alt="@evilrabbit"
                        />
                        <AvatarFallback>ER</AvatarFallback>
                      </Avatar>
                      <Avatar className="w-7 h-7">
                        <AvatarImage
                          src="https://github.com/shadcn.pnga"
                          alt="@shadcn"
                        />
                        <AvatarFallback>
                          <img src="https://github.com/shadcn.png" alt="cn" />
                        </AvatarFallback>
                      </Avatar>
                      <Avatar className="w-7 h-7">
                        <AvatarImage
                          src="https://github.com/leerob.pnga"
                          alt="@leerob"
                        />
                        <AvatarFallback>LR</AvatarFallback>
                      </Avatar>
                      <Avatar className="w-7 h-7">
                        <AvatarImage
                          src="https://github.com/evilrabbit.png"
                          alt="@evilrabbit"
                        />
                        <AvatarFallback>ER</AvatarFallback>
                      </Avatar>
                    </AvatarGroup>
                  </div>
                </CardContent>
              </>
            )}
          />
        </div>
      </section>
    </>
  );
}
