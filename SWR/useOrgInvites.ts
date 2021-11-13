// Retrieves all invites for a logged in user
import axios from "axios";
import useSWR from "swr";
import InvitesService from "../adapters/InvitesService";
import { INVITES_REFRESH_INTERVAL } from "../Config";
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

/**
 *
 * @param userId - The ID of the logged in user
 */
function useOrgInvites(userId: string): useOrgInvitesOutput {
  const shouldFetch = userId ? true : false;

  const { data, error } = useSWR(
    shouldFetch && InvitesService.getInvitesURL(userId),
    fetcher,
    { refreshInterval: INVITES_REFRESH_INTERVAL }
  );

  return {
    invites: data,
    isInvitesLoading: !error && !data,
    isInvitesError: error,
  };
}

export default useOrgInvites;
