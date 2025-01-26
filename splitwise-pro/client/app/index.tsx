import { Text, View, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import "../global.css";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-[#121212] ">
      <ScrollView className="flex-1">
        {/* Header with icons */}
        <View className="px-6 pt-4 flex-row justify-between items-center">
          <View className="flex-1" />
          <View className="flex-row gap-4">
            <TouchableOpacity>
              <Ionicons name="search-outline" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="person-add-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Overall Balance */}
        <View className="px-6 pt-6 pb-4">
          <Text className="text-lg text-white mb-2">Overall, you are owed</Text>
          <Text className="text-3xl font-semibold text-[#4CAF50]">₹19.62</Text>
        </View>

        {/* Groups List */}
        <View className="px-6 space-y-4">
          {/* Group Item */}
          <GroupItem 
            title="Triveni dinner"
            isOwed={true}
            amount={1032.62}
            members={[
              { name: "Vinay p.", amount: 872.04 },
              { name: "Raj B.", amount: 133.75 },
              { name: "Sahil P.", amount: 26.83 }
            ]}
          />

          {/* Non-group expenses */}
          <GroupItem 
            title="Non-group expenses"
            isOwed={false}
            amount={1013.00}
            members={[
              { name: "Vinay p.", amount: -674.00 },
              { name: "Raj B.", amount: -339.00 }
            ]}
            variant="non-group"
          />
        </View>

        {/* Start New Group Button */}
        <View className="px-6 pt-4">
          <TouchableOpacity className="flex-row items-center justify-center border border-[#4CAF50] rounded-lg py-3 px-4">
            <Ionicons name="people-outline" size={24} color="#4CAF50" className="mr-2" />
            <Text className="text-[#4CAF50] text-lg ml-2">Start a new group</Text>
          </TouchableOpacity>
        </View>

        {/* Add Expense FAB */}
        <View className="absolute bottom-20 right-6">
          <TouchableOpacity className="bg-[#4CAF50] p-4 rounded-full flex-row items-center px-6">
            <Ionicons name="receipt-outline" size={24} color="white" className="mr-2" />
            <Text className="text-white text-lg ml-2">Add expense</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Navigation */}
        <View className="h-20 bg-[#1E1E1E] mt-8 flex-row justify-around items-center px-6">
          <NavItem icon="people-outline" label="Groups" active />
          <NavItem icon="person-outline" label="Friends" />
          <NavItem icon="stats-chart-outline" label="Activity" />
          <NavItem icon="person-circle-outline" label="Account" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function GroupItem({ title, isOwed, amount, members, variant = 'group' }: {
  title: string;
  isOwed: boolean;
  amount: number;
  members: Array<{ name: string; amount: number }>;
  variant?: 'group' | 'non-group';
}) {
  const bgColor = variant === 'group' ? 'bg-[#1E3A5F]' : 'bg-[#1E5F46]';
  const icon = variant === 'group' ? 'list-outline' : 'grid-outline';
  
  return (
    <View className={`${bgColor} p-4 rounded-xl`}>
      <View className="flex-row items-center mb-3">
        <View className="bg-white/10 p-2 rounded-lg mr-3">
          <Ionicons name={icon} size={24} color="white" />
        </View>
        <View className="flex-1">
          <Text className="text-white text-lg font-semibold">{title}</Text>
          <Text className={`text-lg ${isOwed ? 'text-[#4CAF50]' : 'text-[#FF5252]'}`}>
            {isOwed ? 'you are owed ' : 'you owe '}
            ₹{amount.toFixed(2)}
          </Text>
        </View>
      </View>
      <View className="space-y-1">
        {members.map((member, index) => (
          <View key={index} className="flex-row justify-between">
            <Text className="text-white/80">{member.name}</Text>
            <Text className={member.amount > 0 ? 'text-[#4CAF50]' : 'text-[#FF5252]'}>
              {member.amount > 0 ? 'owes you ' : 'you owe '}
              ₹{Math.abs(member.amount).toFixed(2)}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function NavItem({ icon, label, active = false }: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  active?: boolean;
}) {
  return (
    <TouchableOpacity className="items-center">
      <Ionicons 
        name={icon} 
        size={24} 
        color={active ? '#4CAF50' : '#888'} 
      />
      <Text className={`text-sm mt-1 ${active ? 'text-[#4CAF50]' : 'text-[#888]'}`}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
