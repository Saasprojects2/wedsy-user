import { Modal, Textarea } from "flowbite-react";

export default function NotesModal({
  notes,
  setNotes,
  UpdateNotes,
  allowEdit,
}) {
  return (
    <>
      <Modal
        show={notes?.open || false}
        size="lg"
        popup
        onClose={() =>
          setNotes({
            open: false,
            edit: false,
            loading: false,
            event_id: "",
            eventDay: "",
            decor_id: "",
            package_id: "",
            admin_notes: "",
            user_notes: "",
          })
        }
      >
        <Modal.Header>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white px-4">
            Notes
          </h3>
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-6">
            <Textarea
              rows={4}
              value={notes?.user_notes}
              onChange={(e) => {
                setNotes({ ...notes, user_notes: e.target.value });
              }}
              readOnly={!allowEdit || !notes?.edit}
            />
            {allowEdit && (
              <button
                className={`text-white bg-rose-900  border border-rose-900 hover:bg-rose-900 hover:text-white font-medium rounded-lg text-sm px-3 py-1.5 focus:outline-none`}
                onClick={() => {
                  if (!notes?.edit) {
                    setNotes({ ...notes, edit: true });
                  } else {
                    UpdateNotes();
                  }
                }}
              >
                {notes?.edit ? "Save Notes" : "Edit Notes"}
              </button>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
