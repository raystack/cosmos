import { cubejsApi } from "api";
import { QueryRenderer, QueryRendererRenderProps } from "@cubejs-client/react";
import { Codeblock } from "@odpf/apsara";
import { Filter } from "@cubejs-client/core";

interface OverviewProps {
    fields: {
        measures: string[];
        dimensions: string[];
        filters: Filter[];
    };
}

export default function QueryViewer({ fields }: OverviewProps) {
    return (
        <QueryRenderer
            cubejsApi={cubejsApi}
            query={fields}
            loadSql
            render={(renderProps: QueryRendererRenderProps) => {
                const sql = renderProps.sqlQuery?.rawQuery().sql[0];
                return (
                    <div>
                        <Codeblock lang="sql" copy>
                            {sql}
                        </Codeblock>
                    </div>
                );
            }}
        />
    );
}
