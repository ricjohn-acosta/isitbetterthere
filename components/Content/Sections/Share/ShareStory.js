import styled from "styled-components";
import dynamic from "next/dynamic";
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Wrapper = styled.div`
  margin: 5% 15% 5% 15%;
`;

const Editor = dynamic(() => import("./Editor"), {
  loading: () => null,
  ssr: false,
});

const ShareStory = () => {
  return (
    <Wrapper>
      <Editor />
    </Wrapper>
  );
};

export default ShareStory;
