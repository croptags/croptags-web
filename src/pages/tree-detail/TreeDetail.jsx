import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dummyData from "@/data/dummy.json";
import { TreeInfoCard } from "@/pages/tree-detail/components/TreeInfoCard";
import { Star } from "lucide-react";

const fetchTreeData = async (treeId) => {
  return dummyData;

  // When Api Ready
  // const res = await fetch(`https://api.croptags.com/trees/${treeId}`);
  // if (!res.ok) throw new Error("Tree not found");
  // return await res.json();
};

export const TreeDetail = () => {
  const { id } = useParams();
  const [tree, setTree] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    fetchTreeData(id)
      .then((data) => {
        setTree(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading tree details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!tree) return <div>No tree data found.</div>;

  const tasteProfile = [
    ["Sweetness", tree.variety.taste_profile.sweet],
    ["Bitterness", tree.variety.taste_profile.bitter],
    ["Creaminess", tree.variety.taste_profile.creaminess],
    ["Aroma", tree.variety.taste_profile.aroma],
  ];

  return (
    <div className="min-h-dvh bg-linear-to-b from-[#F4F6F7] to-[#ECFFF7]">
      <div className="mx-auto w-full max-w-md">
        <div className="px-4 py-5.5 border-b border-[#E3E8EA]">
          <h1 className="font-bold text-primary text-lg leading-tight">
            {tree.farm_name}
          </h1>
        </div>

        <div className="space-y-4 px-4 py-4">
          <TreeInfoCard>
            <h2 className="text-xl font-bold text-[#1E293B] leading-tight">
              {tree.variety.name} ({tree.variety.code})
            </h2>
            <p className="text-[#788D98] text-sm mt-1 mb-2">
              {tree.tree_label}
            </p>
            <p className="text-[#788D98] text-sm leading-relaxed mb-6">
              {tree.variety.description}
            </p>
            <div className="flex text-sm">
              <div className="space-y-4 text-[#788D98] mr-2">
                <div>Tree ID</div>
                <div>Date planted</div>
                <div>Location</div>
              </div>

              <div className="space-y-4 text-foreground">
                <div>{tree.id}</div>
                <div>{tree.date_planted}</div>
                <div>
                  {tree.location.city}, {tree.location.state},{" "}
                  {tree.location.country}
                </div>
              </div>
            </div>
          </TreeInfoCard>
          <TreeInfoCard>
            <h2 className="text-xl font-bold text-[#1E293B] leading-tight">
              Taste Profile
            </h2>
            <div className="mt-6 space-y-2">
              {tasteProfile.map(([label, value]) => (
                <div key={label} className="flex">
                  <div className="w-24 text-[#788D98]">{label}</div>
                  <div className="flex gap-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={24}
                        className={
                          star <= value
                            ? "fill-[#FB923C] text-[#FB923C]"
                            : "text-[#FB923C]"
                        }
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TreeInfoCard>
        </div>
      </div>
    </div>
  );
};
