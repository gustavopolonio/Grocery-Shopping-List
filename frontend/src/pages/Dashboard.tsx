import { useTranslation } from "react-i18next";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-react";
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { Translator } from "@/lib/i18n/Translator";
import { getFirstName, getGreeting, pluralize } from "@/utils";
import { CreateListDialog } from "@/components/layout/CreateListDialog";
import DraggableList from "@/components/ui/draggable-list";
import { Skeleton } from "@/components/ui/skeleton";
import { Typography } from "@/components/ui/typography";
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
import WavingHandIcon from "@/images/waving-hand.png";
import type { List } from "@/@types/list";

export function Dashboard() {
  const { t } = useTranslation();
  const axiosPrivate = useAxiosPrivate();
  const { user } = useUser();
  const queryClient = useQueryClient();

  const {
    data: listsData,
    isError: isListsError,
    isPending: isListsPending,
  } = useQuery({
    staleTime: 1000 * 60 * 60, // 1 hour
    queryKey: ["auth-user-lists"],
    queryFn: async (): Promise<{ lists: List[] }> => {
      const response = await axiosPrivate.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/users/me/lists`
      );
      return response.data;
    },
  });

  function handleReorderDraggableList(lists: List[]) {
    queryClient.setQueryData(["auth-user-lists"], { lists: lists });
  }

  return (
    <>
      <div className="flex gap-3">
        <Typography variant="h1">
          <span className="text-4xl block">
            <Translator path={getGreeting()} />,
          </span>
          {getFirstName(user?.firstName || "")}!
        </Typography>
        <img
          className="w-20 relative -top-8"
          src={WavingHandIcon}
          alt={t("imagesAut.wavingHand")}
        />
      </div>

      <section className="space-y-8">
        <div className="flex justify-between">
          <Typography variant="h2">
            <Translator path="dashboard.lists.title" />
          </Typography>

          <CreateListDialog />
        </div>

        <div className="max-w-2xl mx-auto">
          {isListsError ? (
            <>
              <Typography className="text-destructive text-center">
                {t("dashboard.lists.fail")}
              </Typography>
            </>
          ) : isListsPending ? (
            <div className="space-y-4">
              <Skeleton className="w-full h-24" />
              <Skeleton className="w-full h-24" />
            </div>
          ) : (
            <DraggableList
              items={listsData.lists}
              onReorder={handleReorderDraggableList}
              getId={(item) => item.id}
              renderItem={(item) => (
                <>
                  <CardHeader>
                    <CardTitle>{item.name}</CardTitle>
                    <CardAction>
                      <Typography className="text-sm font-bold">
                        {`${item.itemsCount} ${pluralize(
                          item.itemsCount || 0,
                          t("dashboard.lists.item"),
                          t("dashboard.lists.items")
                        )}`}
                      </Typography>
                    </CardAction>
                  </CardHeader>

                  <CardContent>
                    <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
                      <AvatarGroup max={3}>
                        {item.listMember.map((member) => (
                          <Avatar key={member.profile.id} className="w-7 h-7">
                            <AvatarImage
                              src={member.profile.avatarUrl}
                              alt={member.profile.username.slice(0, 2)}
                            />
                            <AvatarFallback>
                              <img
                                src="https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZG9nfGVufDB8fDB8fHwy"
                                alt="Dg"
                              />
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </AvatarGroup>
                    </div>
                  </CardContent>
                </>
              )}
            />
          )}
        </div>
      </section>
    </>
  );
}
