import { PrismaClient } from "@prisma/client";
import Section from "../section";
import { DynamicTextType } from "@/lib/types/dynamicText";

type DynamicTextProps = {
    id: DynamicTextType["id"];
    children?: React.ReactNode;
};

export async function DynamicSection({ id, children }: DynamicTextProps) {

    const prisma = new PrismaClient();

    const dynamicText = await prisma.dynamicText.findUnique({
        where: {
            id: id,
        },
    });

    if (!dynamicText) {
        return <Section title="Error" subtitle={`${id}`} description="Dynamic text not found" />;
    }
    

    return <Section
        title={dynamicText.title}
        subtitle={dynamicText.subtitle}
        description={dynamicText.description}
        className="bg-neutral-100 dark:bg-neutral-900"
    >
        {children}
    </Section>
}