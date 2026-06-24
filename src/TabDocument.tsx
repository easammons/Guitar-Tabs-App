import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
} from '@react-pdf/renderer'

export interface TabNote {
    measure: number
    string: number
    fret: number
    pitch: string
    duration: number
    flag: string | null
    midi: number
    octave: number
}

export interface TabData {
    tab: TabNote[]
}

interface TabDocumentProps {
    tabData: TabData
}

const STRING_LABELS = ['e', 'B', 'G', 'D', 'A', 'E']
const STRING_COUNT = 6
const CELL_WIDTH = 36

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Helvetica',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
    },
    measureBlock: {
        marginBottom: 28,
    },
    measureLabel: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    staff: {
        flexDirection: 'row',
        alignItems: 'stretch',
    },
    stringLabels: {
        width: 20,
        marginRight: 4,
    },
    stringLabel: {
        height: 16,
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'right',
        paddingRight: 4,
    },
    tabGrid: {
        flex: 1,
        flexDirection: 'column',
    },
    stringRow: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    noteCell: {
        width: CELL_WIDTH,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fretText: {
        fontSize: 10,
        fontWeight: 'bold',
    },
    dashText: {
        fontSize: 10,
        color: '#666',
    },
    pitchRow: {
        flexDirection: 'row',
        marginTop: 6,
        paddingLeft: 24,
    },
    pitchCell: {
        width: CELL_WIDTH,
        alignItems: 'center',
    },
    pitchText: {
        fontSize: 8,
        color: '#555',
    },
})

function groupNotesByMeasure(notes: TabNote[]): Map<number, TabNote[]> {
    const grouped = new Map<number, TabNote[]>()

    for (const note of notes) {
        const measureNotes = grouped.get(note.measure) ?? []
        measureNotes.push(note)
        grouped.set(note.measure, measureNotes)
    }

    return new Map([...grouped.entries()].sort(([a], [b]) => a - b))
}

function TabStaff({ notes }: { notes: TabNote[] }) {
    return (
        <View>
            <View style={styles.staff}>
                <View style={styles.stringLabels}>
                    {STRING_LABELS.map((label) => (
                        <Text key={label} style={styles.stringLabel}>
                            {label}
                        </Text>
                    ))}
                </View>

                <View style={styles.tabGrid}>
                    {Array.from({ length: STRING_COUNT }, (_, stringIndex) => {
                        const stringNumber = stringIndex + 1

                        return (
                            <View key={stringNumber} style={styles.stringRow}>
                                {notes.map((note, noteIndex) => (
                                    <View
                                        key={`${noteIndex}-${stringNumber}`}
                                        style={styles.noteCell}
                                    >
                                        {note.string === stringNumber ? (
                                            <Text style={styles.fretText}>
                                                {note.fret}
                                            </Text>
                                        ) : (
                                            <Text style={styles.dashText}>-</Text>
                                        )}
                                    </View>
                                ))}
                            </View>
                        )
                    })}
                </View>
            </View>

            <View style={styles.pitchRow}>
                {notes.map((note, noteIndex) => (
                    <View key={noteIndex} style={styles.pitchCell}>
                        <Text style={styles.pitchText}>{note.pitch}</Text>
                    </View>
                ))}
            </View>
        </View>
    )
}

export default function TabDocument({ tabData }: TabDocumentProps) {
    const measures = groupNotesByMeasure(tabData.tab ?? [])

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.title}>Guitar Tabs</Text>

                {[...measures.entries()].map(([measureNumber, notes]) => (
                    <View key={measureNumber} style={styles.measureBlock}>
                        <Text style={styles.measureLabel}>
                            Measure {measureNumber}
                        </Text>
                        <TabStaff notes={notes} />
                    </View>
                ))}
            </Page>
        </Document>
    )
}
