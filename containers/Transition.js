import React from "react";
import LowerNavbar from "../components/Navigation/LowerNavbar";
import HeaderSection from "../components/Content/Sections/Transition/HeaderSection";
import OverviewSection from "../components/Content/Sections/Transition/OverviewSection";
import ExperienceSection from "../components/Content/Sections/Transition/ExperienceSection";

const Transition = ({
                        from,
                        to,
                        category,
                        experiences,
                        totalExperiences,
                        allExperiences,
                    }) => {
    return (
        <>
            <LowerNavbar/>
            <HeaderSection
                from={from}
                to={to}
                category={category}
                totalExperiences={totalExperiences}
            />
            <OverviewSection from={from} to={to} allExperiences={allExperiences}/>
            <ExperienceSection
                experiences={experiences}
                totalExperiences={totalExperiences}
            />
        </>
    );
};

export default Transition;
