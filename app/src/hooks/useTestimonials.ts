import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { testimonials as localTestimonials } from "@/lib/data";

export interface Testimonial {
  id?: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("testimonials")
          .select("*");

        if (error || !data || data.length === 0) {
          console.warn("Falling back to local testimonials data:", error?.message);
          setTestimonials(localTestimonials as Testimonial[]);
        } else {
          setTestimonials(data as Testimonial[]);
        }
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setTestimonials(localTestimonials as Testimonial[]);
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  return { testimonials, loading, error };
}
