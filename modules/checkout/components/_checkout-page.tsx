import { useState, useEffect } from 'react';
import CheckoutForm from './_checkout-form';
import ItemsSummary from './_items-summary';
import { PermissionState } from '@/hooks/use-geolocation';
import { CheckoutSession } from '@/modules/products/types/checkout';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const useGeolocation = () => {
  const [permissionState, setPermissionState] = useState<PermissionState>(PermissionState.UNKNOWN);

  useEffect(() => {
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions.query({ name: 'geolocation' }).then(permissionStatus => {
        setPermissionState(permissionStatus.state as PermissionState);
        permissionStatus.onchange = () => {
          setPermissionState(permissionStatus.state as PermissionState);
        };
      });
    }
  }, []);

  const requestLocationPermission = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => setPermissionState(PermissionState.GRANTED),
        () => setPermissionState(PermissionState.DENIED)
      );
    }
  };

  return { permissionState, requestLocationPermission };
};

type Props = {
  checkoutSession: CheckoutSession
}

const CheckoutPageComponent = ({ checkoutSession }: Props) => {
  const { permissionState, requestLocationPermission } = useGeolocation();
  const [bannerVisible, setBannerVisible] = useState(true);
  const showBanner = bannerVisible && permissionState !== PermissionState.GRANTED;
  const router = useRouter();

  useEffect(() => {
    if (!showBanner) return;

    switch (permissionState) {
      case PermissionState.PROMPT:
      case PermissionState.UNKNOWN:
        toast("Location access is required to autofill your address details.");
        break;
      case PermissionState.DENIED:
        toast("Location access denied. Please enable it in your browser settings.");
        break;
    }
  }, [permissionState, showBanner]);

  const handleDismissBanner = () => {
    setBannerVisible(false);
  };

  return (
    <div className="min-h-screen bg-transparent w-full">
      <div className="container mx-auto px-4 sm:px-6 pt-6 pb-12 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="w-full">
            <Button onClick={() => {
              localStorage.clear();
              router.push('/');
            }}>Clear</Button>
            <CheckoutForm checkoutSession={checkoutSession} />
          </div>
          <div className="w-full">
            <ItemsSummary checkoutSession={checkoutSession} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPageComponent;