"use client";
import { useAuth } from "@/components/authProvider";
import { ThemeToggleButton } from "@/components/themeToggleButton";
import Image from "next/image";
import { useState } from "react";
import useSWR from "swr";
import WaitlistForm from "./waitlists/form";
import { DJANGO_API_ENDPOINT } from "@/config/defaults";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
export default function Home() {
  const auth = useAuth();

  // Use with Get, fetch is better for event based fetching
  const { data, error, isLoading } = useSWR(
    `${DJANGO_API_ENDPOINT}/hello`,
    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <WaitlistForm />
      <div>{auth.isAuthenticated ? "Hello user" : "Hello guest"}</div>
      <div>
        <ThemeToggleButton />
      </div>
      <div>{JSON.stringify(data)}</div>
    </main>
  );
}
