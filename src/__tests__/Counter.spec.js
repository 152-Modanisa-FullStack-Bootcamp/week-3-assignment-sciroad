import { createLocalVue, shallowMount } from "@vue/test-utils";
import Counter from "@/Counter";
import { getters, actions, mutations, state } from "@/store";
import Vuex from "vuex";
describe("Counter.vue", () => {
  describe("exist chect", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mountComponent();
    });
    it("should component exists", () => {
      expect(wrapper.exists()).toBeTruthy();
    });
    it("should render increase button", () => {
      const increase = wrapper
        .findAll("button")
        .filter((n) => n.text().match("Increase"))
        .at(0);
      expect(increase.exists()).toBeTruthy();
    });
    it("should render decrease button", () => {
      const increase = wrapper
        .findAll("button")
        .filter((n) => n.text().match("Decrease"))
        .at(0);
      expect(increase.exists()).toBeTruthy();
    });
  });
  it("Increase button functionality check", async () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    const increaseFunc = jest.fn();
    const wrapper = shallowMount(Counter, {
      localVue,
      store: new Vuex.Store({
        state,
        getters,
      }),
      methods: {
        increase: increaseFunc,
      },
    });
    const increase = wrapper
      .findAll("button")
      .filter((n) => n.text().match("Increase"))
      .at(0);
    await increase.trigger("click");
    expect(increaseFunc).toHaveBeenCalled();
  });
  it("Decrease button functionality check", async () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    const decreaseFunc = jest.fn();
    const wrapper = shallowMount(Counter, {
      localVue,
      store: new Vuex.Store({
        state,
        getters,
      }),
      methods: {
        decrease: decreaseFunc,
      },
    });
    const decrease = wrapper
      .findAll("button")
      .filter((n) => n.text().match("Decrease"))
      .at(0);
    await decrease.trigger("click");
    expect(decreaseFunc).toHaveBeenCalled();
  });
  it("2 Increase + decrease functionality check", async () => {
    const dispatch = jest.fn();
    const localThis = {
      $store: {
        dispatch,
      },
    };
    Counter.methods.increase.call(localThis);
    expect(dispatch).toHaveBeenCalledWith("increment");

    Counter.methods.increase.call(localThis);
    expect(dispatch).toHaveBeenCalledWith("increment");

    Counter.methods.decrease.call(localThis);
    expect(dispatch).toHaveBeenCalledWith("decrement");
  });
  it("Count text show check", async () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    const count = 10;
    const wrapper=shallowMount(Counter, {
      localVue,
      store: new Vuex.Store({
        state: { count },
        getters: { ...getters },
      }),
    });
    const span= wrapper.find("span");
    expect(span.text()).toEqual(`${count}k`)
  });
});

function mountComponent() {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  return shallowMount(Counter, {
    localVue,
    store: new Vuex.Store({
      state: { ...state },
      getters: { ...getters },
    }),
  });
}
