import { Pencil, Volume2 } from "lucide-react";

const Questions = ({ activeQuestion }: { activeQuestion: number }) => {
  return (
    <div className="w-[60%] bg-gray-100 p-4 rounded-xl flex flex-col gap-y-6">
      <div className="flex gap-2 items-center flex-wrap">
        {[0, 1, 2, 3, 4].map((item) => {
          return (
            <div
              className={`${
                item === activeQuestion - 1 ? "bg-primary" : "bg-gray-300"
              } px-3 py-1.5 rounded-full`}
              key={item}
            >
              <p
                className={`text-sm font-medium ${
                  item === activeQuestion - 1 ? "text-white" : ""
                }`}
              >
                Question {item + 1}
              </p>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-y-4">
        <div className="flex gap-x-2 items-end">
          <p className="font-semibold text-justify">
            Q{activeQuestion + 1}. Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Accusamus, esse? Vitae, dolorum ex. Obcaecati
            molestias eligendi voluptates nisi, aspernatur iste.
          </p>
          <Volume2
            size={24}
            className="text-black hover:text-primary delay-100 transition-all ml-1.5 cursor-pointer my-1 shrink-0"
          />
        </div>
        <div className="flex gap-x-2 items-end">
          <p className="text-justify">
            Answer. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
            ad voluptates eius magnam esse delectus distinctio odit officiis
            repellat adipisci. Quae tempore at dolore rerum! Ut nobis possimus
            numquam necessitatibus facilis tempora totam culpa alias at,
            veritatis amet voluptatem placeat aspernatur consequuntur harum
            distinctio. Harum, commodi deleniti minima assumenda ad ratione
            ipsa, possimus provident, error at vel veniam animi laborum.
          </p>
          <Pencil
            size={24}
            className="text-black hover:text-primary delay-100 transition-all ml-1.5 cursor-pointer my-1 shrink-0"
          />
        </div>
      </div>
    </div>
  );
};

export default Questions;
