// import { useSetAtom } from "jotai";
// import { useEffect, useRef } from "react";
// import { formDataAtom, initialFormData } from "~/components/ui/Form";

// export const useResetFormData = () => {
//   const setFormData = useSetAtom(formDataAtom);
//   const formDataRef = useRef(false);

//   useEffect(() => {
//     if (!formDataRef.current) {
//       setFormData(initialFormData);

//       formDataRef.current = true;
//     }
//   }, [setFormData]);
// };
