import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
    let urlTitle = blog.title.replace(/[^a-zA-Z0-9\s]/g, "").replace(/\s+/g, "-");

    const navigate = useNavigate();
    const goToBlog = () => {
        navigate(`/blogs/${urlTitle}`, {
            state: {
                title: blog.title
            }
        }
        )
    }

    return (
        <div className="bg-black shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300 text-white">
            <img
                src={blog.cover}
                alt={blog.title}
                className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col justify-between">
                <span className="text-xs font-semibold text-black bg-[#faffa4] px-2 py-1 rounded-md w-fit">
                    {blog.category}
                </span>
                <h2 className="mt-2 text-lg font-semibold text-white hover:text-blue-600 transition cursor-pointer" onClick={goToBlog}>
                    {blog.title}
                </h2>
                <p className="text-gray-400 text-justify text-sm mt-1">
                    {blog.metaDescription}
                </p>
            </div>
        </div>
    );
};

export default BlogCard;
