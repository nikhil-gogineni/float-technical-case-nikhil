import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";

const HomeContext = createContext({});

export const useHomeContext = () => useContext(HomeContext);

const HomeContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResults] = useState([]);
  const [tags, setTags] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);

  const fetchTagsAndTeams = () => {
    try {
      axios.get("/api/tags").then((response) => {
        setTags(response?.data || []);
      });
      axios
        .get("/api/teams")
        .then((response) => setTeams(response?.data || []));
    } catch (error) {}
  };

  const fetchTransactions = useCallback(async () => {
    setIsLoading(true);
    try {
      const queryValues = [];
      if (selectedTeam) {
        queryValues.push(`team=${selectedTeam}`);
      }
      if (selectedTag) {
        queryValues.push(`tag=${selectedTag}`);
      }
      if (selectedDate?.[0]) {
        queryValues.push(`start_date=${selectedDate[0].format("YYYY/MM/DD")}`);
      }
      if (selectedDate?.[1]) {
        queryValues.push(`end_date=${selectedDate[1].format("YYYY/MM/DD")}`);
      }
      const finalQueryVal = ''
      if(queryValues?.length > 0){
          finalQueryVal = "?" + queryValues?.join("&")
      }
      const response = await axios.get(`/api/transactions${finalQueryVal}`);
      setResults(response?.data || []);
    } catch (error) {
      setResults([]);
    }
    setIsLoading(false);
  }, [selectedDate, selectedTag, selectedTeam]);

  useEffect(() => {
    fetchTagsAndTeams();
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [selectedTag, selectedTeam, selectedDate, fetchTransactions]);

  return (
    <HomeContext.Provider
      value={{
        isLoading,
        setIsLoading,
        tags,
        teams,
        fetchTransactions,
        result,
        setResults,
        selectedDate,
        setSelectedDate,
        selectedTeam,
        setSelectedTeam,
        selectedTag,
        setSelectedTag,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export default HomeContextProvider;
