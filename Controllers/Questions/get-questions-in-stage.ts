import { Request, Response } from "express";
import * as Questions from "../../models/Questions";
import * as Stages from "../../models/Stages";
import * as CreateError from "../../utils/createError";
const main = async (req: Request, res: Response) => {
  const { session } = res.locals;
  const { openingId, stageId } = req.params;

  const [stage, stageError] = await Stages.GetStageById({
    openingId,
    stageId,
    orgId: session.orgId,
  });

  if (stageError) {
    const { status, body } = CreateError.SDK(
      stageError,
      "An error ocurred retrieving your stage info"
    );
    return res.status(status).json(body);
  }
  if (!stage) {
    return res.status(404).json({ message: "Stage not found" });
  }

  const { questionOrder } = stage;

  if (questionOrder.length === 0) {
    return res.status(200).json([]);
  }
  try {
    const results = await Promise.all(
      questionOrder.map(async (id: string) => {
        const [question, error] = await Questions.GetQuestionById({
          orgId: session.orgId,
          questionId: id,
        });

        console.log("Question info", question);
        if (error) {
          console.error(error);
          throw "An error ocurred retrieving the questions for this stage";
        }
        // TODO it is possible that a question was deleted so the question will return undefined
        return question;
      })
    );

    const sortedQuestions = questionOrder.map((i: string) =>
      results.find((j) => j.questionId === i)
    );
    return res.status(200).json(sortedQuestions);
  } catch (error) {
    const { status, body } = CreateError.SDK(
      error,
      "An error ocurred retrieving the questions for this stage"
    );
    return res.status(status).json(body);
  }
};
export default main;
