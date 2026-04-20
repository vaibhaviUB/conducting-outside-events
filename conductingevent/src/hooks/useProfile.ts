import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export interface UserProfile {
  id: string;
  email: string | undefined;
  name: string;
  bio: string;
  avatar_url: string | null;
}

export function useProfile() {
  return useQuery<UserProfile | null>({
    queryKey: ["profile"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return null;

      const { data: profile } = await supabase
        .from("profiles")
        .select("id, name, bio, avatar_url")
        .eq("id", user.id)
        .single();

      const displayName =
        profile?.name?.trim() ||
        user.user_metadata?.name?.trim() ||
        user.email?.split("@")[0] ||
        "User";

      return {
        id: user.id,
        email: user.email,
        name: displayName,
        bio: profile?.bio?.trim() || "",
        avatar_url: profile?.avatar_url || null,
      };
    },
  });
}
