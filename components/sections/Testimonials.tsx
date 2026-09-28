import { testimonials, type Testimonial } from "@/lib/data";
import { TestimonialCards } from "./TestimonialCards";
export function Testimonials({ title = "The people make the place", subtitle = "In our community’s own words", items = testimonials }: { title?: string; subtitle?: string; items?: Testimonial[]; maxWidth?: string }) {
  return <section id="testimonials" className="section-y"><div className="shell"><h2 className="text-title">{title}</h2><p className="mt-3 text-body text-muted">{subtitle}</p><TestimonialCards items={items} /></div></section>;
}
