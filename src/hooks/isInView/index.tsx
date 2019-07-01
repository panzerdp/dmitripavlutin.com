import { useInView } from 'react-intersection-observer';

export default function isInView(): [((node?: Element | null) => void), boolean] {
  const [ref, , record] = useInView();
  let isElementInView = false;
  if (record != null && !record.isIntersecting) {
    isElementInView = true;
  }
  return [ref, isElementInView];
}
