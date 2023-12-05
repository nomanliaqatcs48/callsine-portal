import React, { useEffect, useState } from "react";
import { personCount } from "../../services/persons.service";

export const usePersonCounts = () => {
  const [personCounts, setPersonCounts] = useState<Record<string, any>>({});
  const [isFetching, setIsFetching] = useState(false);
  const [fetchKey, setFetchKey] = useState(0); // Introduce a key for re-render

  const getPersonCounts = async () => {
    try {
      setIsFetching(true);
      let res = await personCount();
      if (res.status === 200) {
        setPersonCounts(res.data);
      }
    } catch (e) {
      // Handle error
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    getPersonCounts();
  }, [fetchKey]); // Re-run whenever fetchKey changes

  return {
    getPersonCounts,
    personCounts,
    isFetching,
    forceRerender: () => setFetchKey((prevKey) => prevKey + 1),
  };
};



// import React, { useEffect, useState } from "react";
// import { personCount } from "../../services/persons.service";

// export const usePersonCounts = () => {
//   const [personCounts, setPersonCounts] = useState<Record<string, any>>({});
//   const [isFetching, setIsFetching] = useState(false);

//   const getPersonCounts = async () => {
//     try {
//       setIsFetching(true);
//       let res = await personCount();
//       if (res.status === 200) {
//         setPersonCounts(res.data);
//       }
//     } catch (e) {
//       // Handle error
//     } finally {
//       setIsFetching(false);
//     }
//   };

//   useEffect(() => {
//     getPersonCounts();
//   }, []); // Run once on mount

//   return {
//     getPersonCounts,
//     personCounts,
//     isFetching,
//   };
// };



// import React, { useEffect, useState } from "react";
// import { personCount, personForceEnable } from "../../services/persons.service";

// export const usePersonCounts = () => {
//   const [personCounts, setPersonCounts] = useState<Record<string, any>>({});

//   const [isFetching, setIsFetching] = useState(false);

//   const getPersonCounts = async () => {
//     try {
//       let res = await personCount();
//       if (res.status === 200) {
//         setPersonCounts(res.data);
//         setIsFetching(false);
//       }
//     } catch (e) {
//       setIsFetching(false);
//       return null;
//     }
//   };

//   useEffect(() => {
//     getPersonCounts();
//   }, [personCounts]);

//   return {
//     getPersonCounts,
//     personCounts,
//     isFetching,
//   };
// };
