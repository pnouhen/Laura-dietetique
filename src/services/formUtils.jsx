export function isFormEmpty(refs, additionalChecks = []) {
  const emptyRefs = refs.some(ref => !ref.current?.value);
  const failedAdditional = additionalChecks.some(check => !check);
  return emptyRefs || failedAdditional;
}

export function resetFormFields(refs, resetStates = []) {
  refs.forEach(ref => {
    if (ref.current) ref.current.value = "";
  });
  resetStates.forEach(reset => reset());
}
