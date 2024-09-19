import { getUserById } from "@/services/user";
import { GetReviewsByMultiplePoertyId } from "@/services/Review";
import AgentSingle from "@/components/property/agent-single/AgentSingle";
import { getAllPropertyByUserIdInParameter } from "@/services/propertyServices";

// This is a Server Component
const AgentSinglePage = async ({ params }) => {
  const userById = await getUserById(params.id);
  const propertyByuid = await getAllPropertyByUserIdInParameter(params?.id);
  const tempArray = propertyByuid.map((element) => element.id);
  const finalReviws = await GetReviewsByMultiplePoertyId(tempArray);

  return (
    <AgentSingle
      userById={userById}
      propertyByuid={propertyByuid}
      finalReviws={finalReviws}
    />
  );
};

export default AgentSinglePage;
