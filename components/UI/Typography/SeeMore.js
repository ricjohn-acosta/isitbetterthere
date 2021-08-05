import React from 'react';
import {Button} from "@material-ui/core";
import {useRouter} from "next/router";
import {Send} from '@material-ui/icons';
import convertStoryBlockToPlainText from "../../../lib/utils/convertStoryBlockToPlainText";

const SeeMore = (props) => {

    const {children, userId, experienceId} = props;
    const router = useRouter()
    const maxLength = 445;
    const plainStory = convertStoryBlockToPlainText(children)

    const handleRouter = (userId, experienceId) => {
        router.push({
            pathname: `/user/${userId}`,
            query: {
                story: experienceId
            }
        })
    }

    if (plainStory.length > maxLength) {
        return <span>
            {plainStory.substr(0, maxLength)}...
            <Button onClick={() => handleRouter(userId, experienceId)}
                    size={'small'}
                    variant={'text'} color={'primary'}
                    endIcon={<Send fontSize={'small'}/>}
            >
                Read more
            </Button>
        </span>
    } else {
        return <>{children}</>
    }
};

export default SeeMore;