// Retrieves a specific user by ID
import axios from "axios";
import useSWR from "swr";
import OrgsService from "../adapters/OrgsService";
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

// Returns private details about an org. Must be signed in
function usePrivateOrgById(org_id: string): useOrgOutput {
  const shouldFetch = org_id != "NO_ORG_ASSIGNED" ? true : false;

  // TODO make sure this org ID is being passed by the user
  const { data, error } = useSWR(
    shouldFetch && OrgsService.getOrgURL({ org_id }),
    fetcher
  );

  return {
    org: data,
    isOrgLoading: !error && !data,
    isOrgError: error,
  };
}

export default usePrivateOrgById;
