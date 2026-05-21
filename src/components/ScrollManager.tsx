import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

type SavedLocation = {
  key: string;
  pathname: string;
};

export function ScrollManager() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const scrollPositions = useRef(new Map<string, number>());
  const previousLocation = useRef<SavedLocation>({
    key: location.key,
    pathname: location.pathname,
  });
  const hasMounted = useRef(false);

  useEffect(() => {
    const originalScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = originalScrollRestoration;
    };
  }, []);

  useLayoutEffect(() => {
    const fromLocation = previousLocation.current;
    const isNewPathname = fromLocation.pathname !== location.pathname;

    if (!hasMounted.current) {
      hasMounted.current = true;
    } else if (isNewPathname) {
      const top = navigationType === "POP" ? scrollPositions.current.get(location.key) ?? 0 : 0;
      window.scrollTo({ top, left: 0, behavior: "auto" });
    }

    previousLocation.current = {
      key: location.key,
      pathname: location.pathname,
    };

    return () => {
      scrollPositions.current.set(location.key, window.scrollY);
    };
  }, [location.key, location.pathname, navigationType]);

  return null;
}
