import React from 'react';
import {Button} from "@material-ui/core";
import {useRouter} from "next/router";
import {Send} from '@material-ui/icons';

const SeeMore = (props) => {

    const {children, userId, experienceId} = props;
    const router = useRouter()
    const maxLength = 445;

    const handleRouter = (userId, experienceId) => {
        router.push({
            pathname: `/user/${userId}`,
            query: {
                story: experienceId
            }
        })
    }

    if (children[0].props.children.length > maxLength) {
        return <span>
            {children[0].props.children.substr(0, maxLength)}...
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