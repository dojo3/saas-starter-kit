import toast from 'react-hot-toast';
import { Button } from 'react-daisyui';
import { useTranslation } from 'next-i18next';

import useTeam from 'hooks/useTeam';
import { Price } from '@prisma/client';
import PaymentButton from './PaymentButton';
import { Service, Subscription } from '@prisma/client';

interface ProductPricingProps {
  plans: any[];
  subscriptions: (Subscription & { product: Service })[];
}

const ProductPricing = ({ plans, subscriptions }: ProductPricingProps) => {
  const { team } = useTeam();
  const { t } = useTranslation('common');

  const initiateCheckout = async (price: string, quantity?: number) => {
    const res = await fetch(
      `/api/teams/${team?.slug}/payments/create-checkout-session`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ price, quantity }),
      }
    );

    const data = await res.json();

    if (data?.data?.url) {
      window.open(data.data.url, '_blank', 'noopener,noreferrer');
    } else {
      toast.error(
        data?.error?.message ||
          data?.error?.raw?.message ||
          t('stripe-checkout-fallback-error')
      );
    }
  };

  const hasActiveSubscription = (price: Price) =>
    subscriptions.some((s) => s.priceId === price.id);

  return (
    <section className="py-3" id="pricing">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div
          className="relative rounded-md bg-white border border-gray-200"
        >
          <div className="p-8">
            <div className="flex items-center space-x-2">
              <h3 className="font-display text-2xl font-bold text-black">Monthly</h3>
            </div>
            <p className="mt-2 text-gray-500">$100 per month</p>
          </div>
          <div className="flex justify-center flex-col gap-2 border-gray-200 px-8 h-10">
            <PaymentButton
              plan={{
                id: 'monthly-plan',
                name: 'Monthly',
                description: 'CheatGPT Monthly Subscription',
                prices: [
                  {
                    id: 'price_monthly',
                    recurring: {
                      interval: 'month',
                      interval_count: 1,
                    },
                    unit_amount: 10000,
                    currency: 'usd',
                  },
                ],
                features: [
                  'AI-powered study assistance',
                  'Detailed explanations for answers',
                  'Unlimited practice questions',
                  'Progress tracking',
                ],
              }}
              price={{
                id: 'price_monthly',
                recurring: {
                  interval: 'month',
                  interval_count: 1,
                },
                unit_amount: 10000,
                currency: 'usd',
              }}
              initiateCheckout={initiateCheckout}
            />
          </div>
        </div>
        <div
          className="relative rounded-md bg-white border border-gray-200"
        >
          <div className="p-8">
            <div className="flex items-center space-x-2">
              <h3 className="font-display text-2xl font-bold text-black">Annual</h3>
            </div>
            <p className="mt-2 text-gray-500">$600 per year</p>
          </div>
          <div className="flex justify-center flex-col gap-2 border-gray-200 px-8 h-10">
            <PaymentButton
              plan={{
                id: 'annual-plan',
                name: 'Annual',
                description: 'CheatGPT Annual Subscription',
                prices: [
                  {
                    id: 'price_annual',
                    recurring: {
                      interval: 'year',
                      interval_count: 1,
                    },
                    unit_amount: 60000,
                    currency: 'usd',
                  },
                ],
                features: [
                  'AI-powered study assistance',
                  'Detailed explanations for answers',
                  'Unlimited practice questions',
                  'Progress tracking',
                  '2 months free',
                ],
              }}
              price={{
                id: 'price_annual',
                recurring: {
                  interval: 'year',
                  interval_count: 1,
                },
                unit_amount: 60000,
                currency: 'usd',
              }}
              initiateCheckout={initiateCheckout}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPricing;
