import {getUser} from "@/app/actions/getUser";
import NotAuthorized from "@/components/not-authorized";
import {auth} from "@clerk/nextjs/server";

export async function AdminAuthWrapper({children}: {children: React.ReactNode}) {
  const {userId} = auth();

  if (!userId) {
    return <NotAuthorized />;
  }
  const {user} = await getUser(userId);
  const isAdmin = user?.is_admin;

  if (user === null) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    return <NotAuthorized />;
  }

  return <>{children}</>;
}
