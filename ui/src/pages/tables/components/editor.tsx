import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { updateTable } from "api";
import { useEffect, useRef } from "react";
import styles from "../styles/style.module.css";
import { Button, Text, Popover, notification } from "@odpf/apsara";
import { Table } from "types";

interface CubeEditorProps {
    table?: Table | null;
}

export default function CubeEditor({ table }: CubeEditorProps) {
    const editorRef = useRef<editor.ICodeEditor | null>(null);
    function handleEditorDidMount(editor: editor.ICodeEditor) {
        editorRef.current = editor;
    }
    useEffect(() => {
        editorRef.current?.revealLine(0);
    }, [table?.tableId]);

    async function onSave() {
        try {
            const value = editorRef.current?.getValue();
            if (table?.urn) {
                await updateTable(table?.urn, { content: value });
                notification.success({ message: "Update success" });
            }
        } catch (err) {
            notification.error(err);
        }
    }

    return (
        <div className={styles.editorWrapper}>
            <div className={styles.topBar}>
                <Text className={styles.topBarTitle} strong>
                    {table?.tableId}
                </Text>
                <div className={styles.topBarActions}>
                    <Popover title="Commit Message" message={"Ok"} onOk={onSave}>
                        <Button className={styles.actionbBtn} size="small" type="barebone" iconProps={{ name: "save" }}>
                            Save
                        </Button>
                    </Popover>
                    <Button className={styles.actionbBtn} size="small" type="barebone" iconProps={{ name: "history" }}>
                        History
                    </Button>
                </div>
            </div>
            <Editor
                width={"100%"}
                height="calc(100vh - 64px)"
                defaultLanguage="javascript"
                value={table?.content}
                onMount={handleEditorDidMount}
            />
        </div>
    );
}
