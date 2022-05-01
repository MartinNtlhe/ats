import { PlusIcon, TrashIcon, PencilAltIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import useStore from '../../utils/store';
import Breadcrumbs from '../Breadcrumbs';
import useStageInfo from '../../SWR/useStageInfo';
import * as Time from '../../utils/time';
import { CUSTOM_QUERY } from '../../types/main';
import UpdateStageModal from './UpdateStageModal';
import CreateQuestionModal from '../Questions/CreateQuestionModal';
import CustomLink from '../CustomLink';

export default function StageSettingsHeader({ deleteStage }) {
  const router = useRouter();
  const { openingId, stageId } = router.query as Pick<CUSTOM_QUERY, 'openingId' | 'stageId'>;

  const openUpdateStageModal = useStore((state) => state.openUpdateStageModal);
  const { stage, isStageLoading, isStageError } = useStageInfo(openingId, stageId);

  const openCreateQuestionModal = useStore((state) => state.openCreateQuestionModal);

  const crumbs = [
    {
      name: 'Applicants',
      href: `/openings/${openingId}/stages/${stageId}/applicants`,
      current: false,
    },
    {
      name: 'Opening Settings',
      href: `/openings/${openingId}/settings`,
      current: false,
    },
    {
      name: 'Stage Settings',
      href: `/openings/${openingId}/stages/${stageId}/settings`,
      current: true,
    },
  ];

  return (
    <div className="md:flex md:items-center md:justify-between ">
      <UpdateStageModal stage={stage} />
      <CreateQuestionModal />

      <div className=" min-w-0 flex flex-col items-start ">
        <Breadcrumbs crumbs={crumbs} />
      </div>

      <p className="text-md text-light text-center">Created {Time.relative(stage?.createdAt)}</p>

      <div className="space-x-4 flex items-center">
        <button
          type="button"
          onClick={openUpdateStageModal}
          className="inline-flex items-center px-4 py-2 border  shadow-sm text-base font-medium rounded-md border-blue-500 text-blue-500 bg-white hover:bg-blue-500 hover:text-white  transition ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PencilAltIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
          Edit Stage
        </button>

        <button
          onClick={() => deleteStage()}
          className="rounded-full hover:bg-red-500 hover:text-white border border-red-500 text-red-500 transition ease-in-out duration-200 px-2 py-2 text-md"
        >
          <TrashIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
