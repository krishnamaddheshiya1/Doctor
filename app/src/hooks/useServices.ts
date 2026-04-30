import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { services as localServices } from "@/lib/data";

export interface Service {
  id?: string;
  title: string;
  description: string;
  image: string;
  icon: string;
  order: number;
  featured: boolean;
}

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, _setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchServices() {
      try {
        setLoading(true);
        // Attempt to fetch from Supabase
        const { data, error } = await supabase
          .from("services")
          .select("*")
          .order("order", { ascending: true });

        if (error || !data || data.length === 0) {
          // Fallback to local data if table doesn't exist or is empty
          console.warn("Falling back to local services data:", error?.message);
          setServices(localServices as Service[]);
        } else {
          setServices(data as Service[]);
        }
      } catch (err) {
        console.error("Error fetching services:", err);
        setServices(localServices as Service[]);
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, []);

  return { services, loading, error };
}
