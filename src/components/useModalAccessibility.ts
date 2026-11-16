
import { useEffect, useRef } from 'react';

export function useModalAccessibility(
  open: boolean,
  onClose: () => void
) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    // Запоминаем элемент, с которого открыли окно.
    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    // Сохраняем текущие стили прокрутки.
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow =
      document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const focusableSelector = [
      'button:not([disabled])',
      'a[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ');

    function getFocusableElements(): HTMLElement[] {
      if (!dialog) return [];

      return Array.from(
        dialog.querySelectorAll<HTMLElement>(focusableSelector)
      ).filter(
        (element) =>
          element.getClientRects().length > 0 &&
          element.getAttribute('aria-hidden') !== 'true'
      );
    }

    // Переводим фокус внутрь модального окна.
    const initialFocus = getFocusableElements()[0];

    if (initialFocus) {
      initialFocus.focus();
    } else {
      dialog.focus();
    }

    function handleKeyDown(event: KeyboardEvent) {
      // Escape уже обрабатывается в App.tsx.
      if (event.key !== 'Tab') return;

      const elements = getFocusableElements();

      if (elements.length === 0) {
        event.preventDefault();
        dialog?.focus();
        return;
      }

      const first = elements[0];
      const last = elements[elements.length - 1];

      const active = document.activeElement;

      if (event.shiftKey) {
        if (
          active === first ||
          !dialog?.contains(active)
        ) {
          event.preventDefault();
          last.focus();
        }
      } else {
        if (
          active === last ||
          !dialog?.contains(active)
        ) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);

      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow =
        previousHtmlOverflow;

      // Не возвращаем фокус на карточку каталога,
      // если уже открывается другое модальное окно.
      const anotherDialog = Array.from(
        document.querySelectorAll('[role="dialog"]')
      ).some((element) => element !== dialog);

      if (
        !anotherDialog &&
        previousFocus?.isConnected
      ) {
        previousFocus.focus();
      }
    };
  }, [open]);

  return dialogRef;
}
