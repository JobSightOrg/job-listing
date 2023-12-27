"use client";

import React, { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import NavBar from "./_components/navbar";
import JobSearch from "./_components/job-search";
import JobPost from "./_components/job-post";
import AddModal from "./_components/add-modal";

export interface JobListings {
  id: number;
  url: string;
  companyName: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default function Home() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [jobListings, setJobListings] = useState<JobListings[]>([]);

  const loadJobListings = (): Promise<void> =>
    fetch("/api/listing", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setJobListings(data))
      .catch((err) => console.error(err));

  useEffect((): void => {
    loadJobListings();
  }, []);

  return (
    <main className="h-dvh">
      <SessionProvider>
        <div className="h-1/8">
          <NavBar />
        </div>
        <div className="items-center justify-between pt-10 px-[25rem] h-7/8">
          <JobSearch openAddModal={() => setShowAddModal(true)} />
          <JobPost
            jobListings={jobListings}
            loadJobListings={loadJobListings}
          />
          <AddModal
            isVisible={showAddModal}
            loadJobListings={loadJobListings}
            onClose={() => setShowAddModal(false)}
          />
        </div>
      </SessionProvider>
    </main>
  );
}
