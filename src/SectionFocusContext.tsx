import React from 'react';

const SectionFocusContext = React.createContext<{
  activeSectionID: string | null;
  setActiveSectionID: Function;
}>({
  activeSectionID: null,
  setActiveSectionID: () => {}
});

export default SectionFocusContext