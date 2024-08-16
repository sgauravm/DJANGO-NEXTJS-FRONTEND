"use client";
import { useAuth } from "@/components/authProvider";
import { ThemeToggleButton } from "@/components/themeToggleButton";
import useSWR from "swr";
import WaitlistForm from "./waitlists/form";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
export default function Home() {
  const auth = useAuth();

  // Use with Get, fetch is better for event based fetching
  const { data, error, isLoading } = useSWR("/api/hello", fetcher);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>{data && data.apiEndpoint}</div>
      <WaitlistForm />
      <div>{auth.isAuthenticated ? "Hello user" : "Hello guest"}</div>
      <div>
        <ThemeToggleButton />
      </div>
      <div>{JSON.stringify(data)}</div>
    </main>
  );
}
