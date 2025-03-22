import { useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";

export const useHandleNavigation = (to: string) => {
  const router = useRouter();
  const pathname = usePathname();

  return useCallback(() => {
    const currentLocale = pathname!.split("/")[1];
    const newPath = `/${currentLocale}${to}`;
    router.push(newPath);
  }, [router, pathname, to]);
};
