import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

// GraphQL query for deleting a specific block
const mutation = gql`
mutation AddBlock($className: String!, $elementalAreaID: ID!, $afterElementID: ID) {
  addElementToArea(
    ClassName: $className,
    ElementalAreaID: $elementalAreaID,
    AfterElementID: $afterElementID
  ) {
    ID,
    Sort,
    IsPublished,
    IsLiveVersion,
    InlineEditable
  }
}
`;

const config = {
  props: ({ mutate, ownProps: { actions } }) => {
    const handleAddBlock = (className, elementalAreaID, afterElementID) => mutate({
      variables: { className, elementalAreaID, afterElementID },
    });

    return {
      actions: {
        ...actions,
        handleAddBlock,
      },
    };
  },
  options: {
    // Refetch versions after mutation is completed
    refetchQueries: ['ReadBlocksForPage']
  }
};

export { mutation, config };

export default graphql(mutation, config);
