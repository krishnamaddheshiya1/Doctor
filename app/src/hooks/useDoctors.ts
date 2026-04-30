import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { doctors as localDoctors } from "@/lib/data";

export interface Doctor {
  id?: string;
  name: string;
  title: string;
  credentials: string;
  bio: string;
  image: string;
  specialties: string;
  experience: string;
  order: number;
}

export function useDoctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, _setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDoctors() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("doctors")
          .select("*")
          .order("order", { ascending: true });

        if (error || !data || data.length === 0) {
          console.warn("Falling back to local doctors data:", error?.message);
          setDoctors(localDoctors as Doctor[]);
        } else {
          setDoctors(data as Doctor[]);
        }
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setDoctors(localDoctors as Doctor[]);
      } finally {
        setLoading(false);
      }
    }

    fetchDoctors();
  }, []);

  return { doctors, loading, error };
}
