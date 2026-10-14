import { Star } from 'lucide-react';
import GlassFlow from '../components/GlassFlow';
import ShotStrip from '../components/ShotStrip';
import StaggeredText from '../components/StaggeredText';
import GoogleReviewsHub from '../components/GoogleReviewsHub';
import ReviewForm from '../components/ReviewForm';
import { customerReviews, recentOrders } from '../data/reviews';

export default function Reviews() {
  return (
    <div className="bg-ink text-bone min-h-screen">
      <section className="relative pt-40 pb-16 px-6 overflow-hidden">
        <GlassFlow />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-gold uppercase tracking-[0.3em] text-xs mb-3">Happy customers, happy wardrobes</p>
            <StaggeredText
              as="h1"
              text="Happy Customers"
              className="font-display text-5xl text-bone tracking-wide"
            />
          </div>
          <ShotStrip items={customerReviews} />

          <div className="text-center mt-20 mb-10">
            <p className="text-gold uppercase tracking-[0.3em] text-xs mb-3">Packed &amp; dispatched</p>
            <StaggeredText
              as="h2"
              text="Orders Placed Every Day"
              className="font-display text-4xl text-bone tracking-wide"
            />
          </div>
          <ShotStrip items={recentOrders} />
        </div>
      </section>

      <GoogleReviewsHub />

      <section className="py-24 px-6 bg-ink border-t border-hairline/5">
        <div className="max-w-xl mx-auto text-center mb-12">
          <div className="flex items-center justify-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star key={n} size={22} className="fill-gold text-gold" />
            ))}
          </div>
          <p className="text-gold uppercase tracking-[0.3em] text-xs mb-3">Loved the fit?</p>
          <h2 className="font-display text-4xl text-bone tracking-wide">Leave Your Feedback</h2>
          <p className="text-boneDim text-xs mt-2">
            Your reviews help us constantly refine our fabric selection and tailoring in Mohanur.
          </p>
        </div>
        <ReviewForm />
      </section>
    </div>
  );
}
