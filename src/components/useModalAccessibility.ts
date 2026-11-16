
import { useEffect, useRef } from 'react';

export function useModalAccessibility(
  open: boolean,
  onClose: () => void
) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);

  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;

    const previousFocus =
      document.activeElement as HTMLElement | null;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    const dialog = dialogRef.current;

    const focusableSelector =
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const firstFocusable =
      dialog?.querySelector<HTMLElement>(focusableSelector);

    (firstFocusable ?? dialog)?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopImmediatePropagation();
        onCloseRef.current();
        return;
      }

      if (event.key !== 'Tab' || !dialog) return;

      const elements = Array.from(
        dialog.querySelectorAll<HTMLElement>(focusableSelector)
      ).filter((el) => el.getClientRects().length > 0);

      if (elements.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = elements[0];
      const last = elements[elements.length - 1];

      if (
        event.shiftKey &&
        (
          document.activeElement === first ||
          !dialog.contains(document.activeElement)
        )
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        (
          document.activeElement === last ||
          !dialog.contains(document.activeElement)
        )
      ) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener('keydown', onKeyDown, true);

    return () => {
      window.removeEventListener('keydown', onKeyDown, true);

      document.body.style.overflow = previousOverflow;

      previousFocus?.focus();
    };
  }, [open]);

  return dialogRef;
}
